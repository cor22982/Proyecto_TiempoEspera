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
  const [highlightedComment, setHighlightedComment] = useState(null); // Nuevo estado para el mensaje con más likes
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar la expansión
  const contentRef = useRef(null); // Ref para el contenido del mensaje destacado

  useEffect(() => {
    const fetchData = async () => {
      const coment = await llamadowithoutbody("GET");
      setConver(data.id_conversation);
      setComents(coment);
    };

    const fetchHighlightedComment = async () => {
      try {
        const response = await fetch(
          `https://deimoss.web05.lol/get_message_rating/${data.id_conversation}`
        );
        const result = await response.json();

        if (result.success) {
          setHighlightedComment(result.data); // Guardamos el mensaje con más likes
        } else {
          console.error("Error al obtener el mensaje con más likes:", result);
        }
      } catch (error) {
        console.error("Error en fetchHighlightedComment:", error);
      }
    };

    fetchData();
    fetchHighlightedComment();
  }, [llamadowithoutbody, data.id_conversation]);

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

      setContenido("");
      setComents(await llamadowithoutbody("GET"));
      fetchHighlightedComment(); // Actualizar el comentario destacado después de enviar un nuevo comentario
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
        {highlightedComment && (
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
                key={"highlighted"}
                from={`${highlightedComment.name} ${highlightedComment.lastname}`}
                date={highlightedComment.date.substring(
                  0,
                  highlightedComment.date.indexOf("T")
                )}
                coment={highlightedComment.content}
                imageUrl={highlightedComment.image_url}
              />
            ) : (
              <div className={styles.collapsedText}>Mensaje Destacado</div>
            )}
          </div>
        )}
        {coments
          .filter((com) => com.id_message !== highlightedComment?.id_message)
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
