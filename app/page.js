import styles from "./page.module.css";
import Clicker from "./components/Clicker";

export default function Home() {
  return (
    <main className={styles.main}>
      <Clicker />
    </main>
  );
}
