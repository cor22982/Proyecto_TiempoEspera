PGDMP      $                |            proy    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    131374    proy    DATABASE     {   CREATE DATABASE proy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Guatemala.1252';
    DROP DATABASE proy;
                postgres    false            �            1259    132638    times    TABLE     �   CREATE TABLE public.times (
    id_times integer NOT NULL,
    id_intitutions integer,
    "Lunes" integer,
    "Martes" integer,
    "Miercoles" integer,
    "Jueves" integer,
    "Viernes" integer,
    "Finde" integer
);
    DROP TABLE public.times;
       public         heap    postgres    false            �          0    132638    times 
   TABLE DATA           w   COPY public.times (id_times, id_intitutions, "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Finde") FROM stdin;
    public          postgres    false    240   7                  2606    132642    times times_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_pkey PRIMARY KEY (id_times);
 :   ALTER TABLE ONLY public.times DROP CONSTRAINT times_pkey;
       public            postgres    false    240                       2606    132643    times institutions    FK CONSTRAINT     �   ALTER TABLE ONLY public.times
    ADD CONSTRAINT institutions FOREIGN KEY (id_intitutions) REFERENCES public.intitutions(id_institutions);
 <   ALTER TABLE ONLY public.times DROP CONSTRAINT institutions;
       public          postgres    false    240            �      x������ � �     