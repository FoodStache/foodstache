--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: images; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.images (
    id SERIAL PRIMARY KEY,
    createdon date NOT NULL,
    link character varying NOT NULL,
    recipe_id integer NOT NULL
);

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.ratings (
    id SERIAL PRIMARY KEY,
    rating_val integer NOT NULL,
    recipe_id integer NOT NULL
);

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.recipes (
    id SERIAL PRIMARY KEY,
    title character varying NOT NULL,
    ver integer NOT NULL,
    derived_id character varying NOT NULL,
    prepmins integer NOT NULL,
    image_id integer,
    createdon timestamp without time zone NOT NULL,
    descr character varying NOT NULL,
    tag character varying,
    user_id integer NOT NULL
);

--
-- Name: users; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username character varying NOT NULL,
    hpass character varying NOT NULL,
    email character varying NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL
);

--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.images (id, createdon, link, recipe_id) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.ratings (id, rating_val, recipe_id) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.recipes (id, title, ver, derived_id, prepmins, image_id, createdon, descr, tag, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.users (id, username, hpass, email, fname, lname) FROM stdin;
\.


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: images images_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


--
-- Name: ratings ratings_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


--
-- Name: recipes recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

