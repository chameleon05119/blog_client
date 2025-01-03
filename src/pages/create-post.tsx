import React, { ChangeEvent, FormEvent } from "react";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // submit時にリロードが走らないようにする
    console.log(title, content);
    try {
      await axios.post("http://localhost:3001/api/v1/posts", {
        title: title,
        content: content,
      });

      router.push("/"); // HOMEにリダイレクト
    } catch (err) {
      alert(`投稿に失敗しました。 :${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label className={styles.label}>本文</label>
        <textarea
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button type="submit" className={styles.button}>
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
