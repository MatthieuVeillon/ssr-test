import React, { useState } from "react";
import { db } from "../config/firebase";
import { data } from "../data";
import { index } from "../config/algolia";

const CreateUser = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [suffix, setSuffix] = useState("");

  const handleSubmitAllFakeUsers = async (event) => {
    event.preventDefault();

    console.log(data);
    const batch = db.batch();

    data.forEach((doc) => {
      const docRef = db.collection("user").doc(); //automatically generate unique id
      batch.set(docRef, doc);
    });

    await batch.commit();
  };

  // TODO : add index on cloud function

  const saveIndex = async () => {
    const users = [];
    await db.collection("user").onSnapshot((snap) => {
      const users = snap.docs;
    });

    const result = [];

    await db
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          result.push(doc.data());
          console.log(result);
        });
      });

    console.log("users in algolia", result);

    try {
      await index.saveObjects(result, {
        autoGenerateObjectIDIfNotExist: true,
      });
    } catch (e) {
      console.log("error in algolia indexing", e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      lastName: lastName,
      firstName: firstName,
    });

    db.collection("user").add({
      lastName,
      firstName,
      suffix,
    });
    setLastName("");
    setFirstName("");
    setSuffix("");
  };
  return (
    <div>
      <h2>Add Blog</h2>

      <button onClick={handleSubmitAllFakeUsers}>Feed DB</button>
      <button onClick={saveIndex}>Feed Algolia</button>
      <form onSubmit={handleSubmit}>
        <div>
          lastName
          <br />
          <input
            type="text"
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
          />
        </div>
        <div>
          firstName
          <br />
          <textarea
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
        </div>

        <div>
          suffix
          <br />
          <input
            type="text"
            value={suffix}
            onChange={({ target }) => setSuffix(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default CreateUser;
