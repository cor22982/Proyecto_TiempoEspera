CREATE TABLE user_pasos (
    id SERIAL PRIMARY KEY, -- Clave primaria para la tabla
    pi_usuario VARCHAR(50) NOT NULL, -- Referencia a users(pi)
    id_procedure INTEGER NOT NULL, -- Referencia a procedures(id)
    pasos_completados VARCHAR[] DEFAULT '{}', -- Array para pasos completados

    -- Clave foránea que referencia a users(pi)
    CONSTRAINT fk_pi_usuario FOREIGN KEY (pi_usuario)
        REFERENCES users(pi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Clave foránea que referencia a procedures(id)
    CONSTRAINT fk_id_procedure FOREIGN KEY (id_procedure)
        REFERENCES procedures(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE user_documents (
    id SERIAL PRIMARY KEY, -- Clave primaria para la tabla
    pi_usuario VARCHAR(50) NOT NULL, -- Referencia a users(pi)
    id_procedure INTEGER NOT NULL, -- Referencia a procedures(id)
    id_document INTEGER NOT NULL, -- Referencia a documents(id_document)

    -- Clave foránea que referencia a users(pi)
    CONSTRAINT fk_pi_usuario FOREIGN KEY (pi_usuario)
        REFERENCES users(pi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Clave foránea que referencia a procedures(id)
    CONSTRAINT fk_id_procedure FOREIGN KEY (id_procedure)
        REFERENCES procedures(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Clave foránea que referencia a documents(id_document)
    CONSTRAINT fk_id_document FOREIGN KEY (id_document)
        REFERENCES documents(id_document)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);