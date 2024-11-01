--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-06 10:20:03

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
-- TOC entry 218 (class 1259 OID 40971)
-- Name: ProceduresDocuments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProceduresDocuments" (
    "Id procedure document" integer NOT NULL,
    "id preocedure" integer,
    "id documents" integer
);


ALTER TABLE public."ProceduresDocuments" OWNER TO postgres;

--
-- TOC entry 4872 (class 0 OID 40971)
-- Dependencies: 218
-- Data for Name: ProceduresDocuments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (1, 1, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (2, 3, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (3, 3, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (4, 4, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (5, 4, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (6, 4, 4);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (7, 5, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (8, 5, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (9, 5, 4);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (10, 6, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (11, 6, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (12, 6, 4);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (13, 6, 5);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (14, 6, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (15, 6, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (16, 7, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (17, 7, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (18, 8, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (19, 8, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (20, 8, 6);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (21, 8, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (22, 8, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (23, 9, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (24, 9, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (25, 9, 6);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (26, 9, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (27, 9, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (28, 10, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (29, 10, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (30, 10, 9);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (31, 10, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (32, 10, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (33, 11, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (34, 11, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (35, 11, 30);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (36, 11, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (37, 11, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (38, 12, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (39, 12, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (40, 12, 11);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (41, 12, 10);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (42, 12, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (43, 13, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (44, 13, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (45, 13, 4);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (46, 13, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (47, 13, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (48, 14, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (49, 14, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (50, 14, 12);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (51, 14, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (52, 15, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (53, 15, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (54, 15, 9);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (55, 15, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (56, 15, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (57, 16, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (58, 16, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (59, 16, 6);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (60, 16, 14);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (61, 16, 13);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (62, 16, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (63, 17, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (64, 17, 15);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (65, 17, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (66, 17, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (67, 22, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (68, 22, 31);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (69, 22, 32);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (70, 22, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (71, 22, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (72, 23, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (73, 23, 32);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (74, 23, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (75, 23, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (76, 24, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (77, 24, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (78, 24, 23);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (79, 24, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (80, 24, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (81, 25, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (82, 25, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (83, 25, 23);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (84, 25, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (85, 25, 7);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (86, 26, 1);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (87, 26, 3);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (88, 26, 24);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (89, 26, 8);
INSERT INTO public."ProceduresDocuments" ("Id procedure document", "id preocedure", "id documents") VALUES (90, 26, 7);


--
-- TOC entry 4726 (class 2606 OID 40975)
-- Name: ProceduresDocuments ProceduresDocuments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProceduresDocuments"
    ADD CONSTRAINT "ProceduresDocuments_pkey" PRIMARY KEY ("Id procedure document");


--
-- TOC entry 4727 (class 2606 OID 40976)
-- Name: ProceduresDocuments Document id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProceduresDocuments"
    ADD CONSTRAINT "Document id" FOREIGN KEY ("id documents") REFERENCES public."Documents"("Id_document");


--
-- TOC entry 4728 (class 2606 OID 40981)
-- Name: ProceduresDocuments Procedures id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProceduresDocuments"
    ADD CONSTRAINT "Procedures id" FOREIGN KEY ("id preocedure") REFERENCES public."Procedures"(id);


-- Completed on 2024-05-06 10:20:03

--
-- PostgreSQL database dump complete
--

