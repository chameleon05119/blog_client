import React, { ChangeEvent, FormEvent } from "react";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Post } from "@/types";

type Props = {
  post: Post;
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
}

const EditPost = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // submit時にリロードが走らないようにする
    console.log(title, content);
    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`, {
        title: title,
        content: content,
      });

      router.push("/"); // HOMEにリダイレクト
    } catch (err) {
      alert(`投稿の編集に失敗しました。 :${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログの編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <label className={styles.label}>本文</label>
        <textarea
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          value={content}
        />
        <button type="submit" className={styles.button}>
          編集の決定
        </button>
      </form>
    </div>
  );
};

export default EditPost;
