ALTER TABLE messages ADD COLUMN image_url character varying; -- añadir columna para rutas  de imagenes

/*
Cambio de columna date para tomar en cuenta la hora
*/
ALTER TABLE messages
ALTER COLUMN date TYPE timestamp;