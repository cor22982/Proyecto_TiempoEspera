ALTER TABLE messages ADD COLUMN likes integer DEFAULT 0;
CREATE OR REPLACE FUNCTION increment_likes(p_id_message integer)
RETURNS void AS $$
BEGIN
  UPDATE messages
  SET likes = likes + 1
  WHERE id_message = p_id_message;
END;
$$ LANGUAGE plpgsql;
