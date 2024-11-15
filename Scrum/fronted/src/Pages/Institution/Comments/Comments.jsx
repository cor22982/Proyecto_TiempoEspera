import TextArea from "@components/Inputs/TextArea/TextArea";
import styles from "./Comments.module.css";
import Coment from "@components/Inputs/Coment/Coment";
import useApi from "@hooks/api/useApi";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt, faStar } from "@fortawesome/free-solid-svg-icons";

const Comentarios = ({ data }) => {
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/messages/${data.id_conversation}`
  );
  const [coments, setComents] = useState([]);
  const [conver, setConver] = useState(null);
  const [contenido, setContenido] = useState("");
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar la expansión
  const contentRef = useRef(null); // Ref para el contenido del mensaje destacado

  useEffect(() => {
    const fetchData = async () => {
      const coment = await llamadowithoutbody("GET");
      setConver(data.id_conversation);
      setComents(coment);
    };

    fetchData();
  }, [llamadowithoutbody]);

  const postComent = async (texto, imagen) => {
    const formData = new FormData();
    formData.append("content", texto);
    formData.append("conversation_id", conver);
    formData.append("date", new Date().toISOString());

    if (imagen) {
      formData.append("image", imagen);
    }

    try {
      const response = await fetch("https://deimoss.web05.lol/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al enviar el comentario:", errorText);
        return;
      }

      const responseData = await response.json();
      console.log("Comentario enviado:", responseData);

      setContenido("");
      setComents(await llamadowithoutbody("GET"));
    } catch (error) {
      console.error("Error en postComent:", error);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const calcularEstrellas = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <FontAwesomeIcon
            key={`full-${i}`}
            className={styles.iconStar}
            icon={faStar}
            onClick={() => handleStarClick(i)}
          />
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <FontAwesomeIcon
            key={"half"}
            className={styles.iconStar}
            icon={faStarHalfAlt}
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        stars.push(
          <i
            key={`empty-${i}`}
            className={`far fa-star ${styles.iconStar}`}
            onClick={() => handleStarClick(i)}
          ></i>
        );
      }
    }

    return stars;
  };

  const latestComment = coments.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, coments[0]);

  // console.log("Comentario destacado:", latestComment);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.comentariosContainerInstitution}>
      <div className={styles.rating}>{calcularEstrellas()}</div>
      <TextArea
        placeholder="Agrega tu comentario"
        value={contenido}
        onChange={(value) => setContenido(value)}
        onClick={postComent}
        className={styles.textareaContainer}
      />
      <br />
      <div className={styles.coments}>
        {latestComment && (
          <div
            ref={contentRef}
            className={`${styles.highlightedComment} ${
              isExpanded ? styles.expanded : styles.collapsed
            }`}
            onClick={toggleExpanded}
            style={{
              height: isExpanded
                ? `${contentRef.current.scrollHeight}px`
                : "40px",
            }}
          >
            {isExpanded ? (
              <Coment
                key={"latest"}
                from={`${latestComment.name} ${latestComment.lastname}`}
                date={latestComment.date.substring(
                  0,
                  latestComment.date.indexOf("T")
                )}
                coment={latestComment.content}
                imageUrl={latestComment.image_url}
              />
            ) : (
              <div className={styles.collapsedText}>Mensaje Destacado</div>
            )}
          </div>
        )}
        {coments
          .filter((com) => com !== latestComment)
          .map((com, index) => (
            <Coment
              key={index}
              from={`${com.name} ${com.lastname}`}
              date={com.date.substring(0, com.date.indexOf("T"))}
              coment={com.content}
              imageUrl={com.image_url}
            />
          ))}
      </div>
    </div>
  );
};

export default Comentarios;
