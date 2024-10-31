import styles from "./Coment.module.css";

const Coment = ({ from, date, coment }) => {
  return (
    <div className={styles.comentario}>
      <div className={styles.headerComent}>
        <h5 className={styles.headComent}>{from}</h5>
        <p className={styles.dateComent}>{date}</p>
      </div>
      <p className={styles.comentContent}>{coment}</p>
    </div>
  );
};

export default Coment;
