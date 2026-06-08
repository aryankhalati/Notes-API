const Note = require('../models/Note');

const createNote = async (req, res) => {
    try {
        const { title, content} = req.body;

        const firstNote = await Note.create({ title, content, userId: req.user.id});
        res.status(201).json({firstNote});
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
}

const getAllNotes = async (req, res) => {
    try{

        const notes = await Note.find({ userId: req.user.id });

         if(!notes){
            return res.status(500).json('Notes not found');
        }

        return res.status(200).json(notes); 
 }
    catch (error){
    res.status(500).json({message: error.message});
}
}

const getOneNote = async (req, res) => {

    try{
    
        const note = await Note.findById(req.params.id)
        

         if(note.userId.toString() !== req.user.id){
            return res.status(403).json({message: 'Not Authorized'})
        }
    
        res.status(200).json(note);
       
    }
     catch (error){
    res.status(500).json({message: error.message});
}
}

const updateNote = async(req, res) => {
    try{

       const note = await Note.findById(req.params.id);
       if(!note) return res.status(404).json({ message: 'Note not found' });

         if(note.userId.toString() !== req.user.id){
            return res.status(403).json({message: 'Not Authorized'})
        } 
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
         return res.status(200).json('Note updated');

    }
    catch (error){
    res.status(500).json({message: error.message});
}
}

const deleteNote = async(req, res) =>{
   try{

      const note = await Note.findById(req.params.id);

     if(note.userId.toString() !== req.user.id){
            return res.status(500).json('Note not found');
        }

         const deletedNote = await Note.findByIdAndDelete(req.params.id); 
         return res.status(200).json('Note deleted');
   }
   catch (error){
    res.status(500).json({message: error.message});
}

}
module.exports = {createNote,getAllNotes,getOneNote, updateNote,deleteNote}