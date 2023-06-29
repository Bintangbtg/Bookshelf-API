const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(6);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const note = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(note);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'Berhasil',
      message: 'Catatan berhasil dibuat',
      data: {
        noteId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Catatan gagal dibuat',
  });

  response.code(500);
  return response;
};

const getNotesHandler = (request, h) => {
  return notes;
};

const getNoteDetailHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: { note },
    };
  }

  const response = h.response({
    status: 'gagal',
    message: 'Not Found',
  });

  response.code(404);
  return response;
};

const editNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'Berhasil',
      message: 'Note successfully Edited',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Not Found',
  });

  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Note successfully Edited',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Not Found',
  });

  response.code(404);
  return response;
};

const handler = {
  addNoteHandler, getNotesHandler, getNoteDetailHandler, editNoteHandler, deleteNoteHandler,
};

module.exports = handler;