const Box = require('../models/Box');
const File = require('../models/File');

class FileController {

    async store(req, res) {

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        const box = await Box.findById(req.params.id);
        box.files.push(file);
        await box.save();

        // Envia notificação a todos  usuarios na mesma box
        req.io.sockets.in(box._id).emit('file', file);

        // Criar arquivo
        return res.json(file);
    }
}

module.exports = new FileController();

