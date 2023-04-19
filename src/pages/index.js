import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { database } from "../../firebaseConfig";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] }); 

export default function Home() {

  const databaseRef = collection(database , 'CRUD Data');
  const [ name , setName ] = useState('');
  const [ age , setAge ] = useState(null);
  const [ fireData , setFireData ] = useState([]);

  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if(token){
       getData();
    }

    if (!token) {
      router.push("/register");
    }
  });


  const addData = () => { 
     addDoc(databaseRef , {
         name : name,
         age : Number(age)
     }).then(() => { 
         alert('Data send');
         setName('')
         setAge(null)
     })
     .catch((err) => {
         console.log(err);
     })
  }

  const getData = async () => {
     await getDocs(databaseRef)
     .then((response) => {
      setFireData(response.docs.map((data) => {
             return {...data.data() , id: data.id};
         }));
     })
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Parimal</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div>
            <button>Log Out</button>
          </div>
          <h1>Home</h1>

          <input
            placeholder="Name"
            className={styles.inputBox}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Age"
            className={styles.inputBox}
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button className={styles.button} onClick={addData} >ADD</button>

        <div>
            {
              fireData.map((data) => {
                 return(
                  <>
                   <div className={styles.flex}>
                        <h3>Name : {data.name}</h3>
                        <p>Age : {data.age}</p>
                   </div>
                  </>
                 )
              })
            }
        </div>
        </main>
      </div>
    </>
  );
}
