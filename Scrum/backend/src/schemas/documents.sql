--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Documents" (
    "Id_document" integer NOT NULL,
    name text DEFAULT 1000 NOT NULL,
    description text DEFAULT 1000
);


ALTER TABLE public."Documents" OWNER TO postgres;

--
-- Data for Name: Documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Documents" ("Id_document", name, description) VALUES (1, 'DPI', 'El Documento Personal de Identificación');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (2, 'Confirmación de cita', 'Documento de confirmación de cita para presentarse');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (3, 'Pasaporte', 'En caso de ser extranjero');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (4, 'Testimonio de escritura pública de mandato', 'Exclusivo para casos especiales');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (5, 'Certificación emitida por el Registro General de la Propiedad, en la que se indique la ubicación geográfica del bien inmueble.', 'En caso de que la propiedad sea extrangera');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (6, 'Documento de Constitución o Documento privado con firma legalizada de la copropiedad.', 'unico para copropiedades, se tiene que consultar abogado para emición');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (7, 'Nombramiento del Representante Legal', 'si está inmerso en el documento de constitución o en el documento privado no se solicitará por separado');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (8, 'Factura por los servicios de agua, luz, teléfono (línea fija y/o celular), recibo del IUSI o documento emitido por la Municipalidad,', 'No tiene que exceder más de 3 meses');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (9, 'Testimonio de la escritura de constitución original', 'Documento que refiere al termino legal de la inscripción (consulte un abogado)');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (10, 'Nombramiento del representante legal original', 'En caso de que el representante ya fue nombrado');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (11, 'Documento de constitución debidamente inscrito en el Instituto Nacional de Cooperativas -INACOP-.', 'Exclusivo de sociedades');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (12, 'Testimonio de escritura pública de Contrato en Participación', 'en el contrato en participación debe indicarse el nombre del Representante Legal que actúe como gestor, la fecha inicio fecha fin');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (13, 'Nombramiento del representante legal inscrito en el Registro de Poderes y Sindicatos del Ministerio de Trabajo y Previsión Social', 'Para sindicatos');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (14, 'Estatutos debidamente inscritos, en el Registro Público de Sindicatos del Ministerio de Trabajo y Previsión Social.', 'Si en el documento de constitución están inmersos los estatutos, no se requiere por separado');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (15, 'Publicación del Decreto del Congreso de la República de Guatemala y/o Acuerdo Ministerial en el Diario Oficial.', 'Solamente si es necesario');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (16, 'Resolución de autorización de su creación y funcionamiento emitida por el Consejo de Enseñanza Privada Superior (CEPS)', 'En caso de ser necesario');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (17, 'Certificación de la Nunciatura Apostólica en Guatemala que indique cuando fue erigida la Arquidiócesis, Diócesis, Vicariato o Prelatura.', 'Para iglesias');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (18, 'Certificación extendida por el Ministerio de Gobernación del documento en que conste la notificación oficial de la designación como Arzobispo/Obispo/Prelado realizada por el representante de la Santa Sede acreditada ante el Gobierno de Guatemala', 'Para iglesias');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (19, 'Documento de constitución debidamente inscrito en el registro correspondiente', 'Documento de constitución debidamente inscrito en el registro correspondiente');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (20, 'Nombramiento del Representante Legal debidamente inscrito en la Liga Deportiva del deporte que este inscribiendo', 'Nombramiento del Representante Legal debidamente inscrito en la Liga Deportiva del deporte que este inscribiendo, vigente');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (21, 'Resolución de la inscripción del Partido Político y la notificación emitidas por el Tribunal Supremo Electoral.', 'Exclusivos de partidos politicos');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (22, 'Certificación de la representación legal emitida por la Dirección General del Registro de Ciudadanos del Tribunal Supremo Electoral', 'Para partidos politicos');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (23, 'Resolución emitida por el Ministerio de Educación (MINEDUC) o Dirección Departamental', 'Resolución emitida por el Ministerio de Educación (MINEDUC) o Dirección Departamental');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (24, 'Testimonio del Acta de Protocolización del documento de constitución, debidamente inscrito en el Registro que corresponda y Patente de Comercio de Sociedad', 'Testimonio del Acta de Protocolización del documento de constitución, debidamente inscrito en el Registro que corresponda y Patente de Comercio de Sociedad');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (25, 'Fijar un domicilio fiscal en Guatemala para lo cual debe presentar factura por los servicios de agua, luz, teléfono (línea fija y/o celular), recibo del IUSI o documento emitido por la Municipalidad, no mayor a tres meses de su emisión del mandatario o responsable', 'ijar un domicilio fiscal en Guatemala para lo cual debe presentar factura por los servicios de agua, luz, teléfono (línea fija y/o celular), recibo del IUSI o documento emitido por la Municipalidad, no mayor a tres meses de su emisión del mandatario o responsable');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (26, 'Testimonio de la escritura de constitución, debidamente registrada en el Registro de la Propiedad', 'Testimonio de la escritura de constitución, debidamente registrada en el Registro de la Propiedad');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (27, 'Original de Estatutos inscritos en el Instituto Nacional de Cooperativas –INACOP-', 'Original de Estatutos inscritos en el Instituto Nacional de Cooperativas –INACOP-');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (28, 'Original de Nombramiento de representante legal inscrito en Instituto Nacional de Cooperativas –INACOP-', 'Original de Nombramiento de representante legal inscrito en Instituto Nacional de Cooperativas –INACOP-');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (29, 'Plataforma en linea', 'Plataforma en linea');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (30, 'Contrato Social y razón, debidamente inscrito por el Registro Mercantil.', 'Contrato Social y razón, debidamente inscrito por el Registro Mercantil.');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (31, 'Resolución de la inscripción del Partido Político y la notificación emitidas por el Tribunal Supremo Electoral', 'Resolución de la inscripción del Partido Político y la notificación emitidas por el Tribunal Supremo Electoral');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (32, 'Estatutos debidamente inscritos en el registro correspondiente.', 'Estatutos debidamente inscritos en el registro correspondiente.');
INSERT INTO public."Documents" ("Id_document", name, description) VALUES (33, 'Resolución de la inscripción del Comité Cívico y notificación emitidas por el Tribunal Supremo Electoral', 'Resolución de la inscripción del Comité Cívico y notificación emitidas por el Tribunal Supremo Electoral');


--
-- Name: Documents Documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY ("Id_document");


--
-- PostgreSQL database dump complete
--

