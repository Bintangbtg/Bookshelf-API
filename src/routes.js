const handler = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteDetailHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.editNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteHandler,
  }];

module.exports = routes;