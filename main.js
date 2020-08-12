const MongoCLient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser"); // use to parse the body in Json Format

const url = "mongodb://localhost:27017";
const app = express();

const main = async () => {
  /* MONGO conection and DataBase création*/
  const client = await MongoCLient.connect(url, { useUnifiedTopology: true });
  const dataBase = client.db("groupGenerator");

  try {
    /* Create Collection */
    await dataBase.createCollection("Students");
    await dataBase.createCollection("Groups");

    /* ROUTES */
    app.listen(8080);

    // middlewear allows  us to support different format
    app.use(bodyParser.json()); // use by req.body property (to have key value)
    app.use(express.urlencoded({ extended: true })); // allow us to read thebody

    /* Accueil */
    app.get("/", function (req, res) {
      res.status(200).send("Vous êtes à laccueil");
    });
    console.log("http://localhost:8080/");

    /*---------------------------------------------------------
    ------------------------- STUDENTS PART -------------------
    ---------------------------------------------------------*/

    /* Students */
    app.get("/Students", async function (req, res) {
      res.status(200).send(await showStudent(dataBase));
    });

    console.log("http://localhost:8080/Students");

    /* Students POST - Add a student */
    app.post("/Students", async function (req, res) {
      res.status(200).send(await addToStudentsCollection(dataBase, req));
    });

    /* Students Delete */
    app.delete("/Students/:name", async function (req, res) {
      res.status(200).send(await deleteStudentsToCollection(dataBase, req));
    });

    /*---------------------------------------------------------
    ------------------------- GROUPS PART ---------------------
    ---------------------------------------------------------*/

    /* Groups */
    app.get("/Groups", async function (req, res) {
      res.status(200).send(await showGroup(dataBase));
    });
    console.log("http://localhost:8080/Groups");

    /* Groups name  must be completed */
    app.get("/Groups/:name", async function (req, res) {
      res.status(200).send(await searchByGroupName(dataBase, req));
    });

    /* Groups Post */
    app.post("/Groups", async function (req, res) {
      res.status(200).send(await addToGroupsCollection(dataBase, req));
    });

    /* Groups Delete  */
    app.delete("/Groups/:name", async function (req, res) {
      res.status(200).send(await deleteGroupsToCollection(dataBase, req));
    });

  } catch (error) {
    console.log(error);
  } finally {
    console.log("!==> Success <==! all is good");
    //client.close();
  }
};
main();

/*---------------------------------------------------------
------------------------- FUNCTION PART -------------------
---------------------------------------------------------*/

/**
 * @summary find in the Groups collection the input, then create an array, if the input does not exist return an error message else return the Groups find
 * @param {*} dataBase
 * @param {*} req
 * @returns the group we were looking for
 */
let searchByGroupName = async (dataBase, req) => {
  const nameOfGroup = await dataBase
    .collection("Groups")
    .find({ name: req.params.name })
    .toArray();

  if (nameOfGroup.length != 0) {
    return nameOfGroup;
  } else {
    return "this group does not exist";
  }
};

/**
 * @summary catch the "Student "to add and push him into an array, then insert him into the collection Students
 * @param {*} dataBase
 * @param {*} req
 * @returns the student to add (input)
 */
let addToStudentsCollection = async (dataBase, req) => {
  let studentToAdd = req.body; //name: "Coco"
  try {
    await dataBase.collection("Students").insertOne(studentToAdd);
  } catch (error) {
    console.log(error);
  }
  return studentToAdd;
};

/**
 * @summary delete in the Student collection the student name input
 * @param {*} dataBase
 * @param {*} req
 * @returns the student name to delete
 */
let deleteStudentsToCollection = async (dataBase, req) => {
  let studentName = req.params.name;
  let test = await dataBase
    .collection("Students")
    .find({ name: studentName })
    .toArray();
  if (test.length > 0) {
    try {
      await dataBase.collection("Students").deleteOne({ name: studentName });
    } catch (error) {
      console.log(error);
    }
    return studentName;
  } else {
    return "this student doesn't exist";
  }
};

/**
 * @summary read the Students collection and assign the content to nameOfStudent
 * @returns an array of students stock in the collection Students (nameOfStudent)
 * @param {*} dataBase
 */
let showStudent = async (dataBase) => {
  const nameOfStudent = await dataBase.collection("Students").find().toArray();
  return nameOfStudent;
};

/**
 * @summary read the Groups collection and assign  the content to nameOfGroup
 * @param {*} dataBase
 * @returns an array of groups stock in the collection Groups (nameOfGroup)
 */
let showGroup = async (dataBase) => {
  const nameOfGroup = await dataBase.collection("Groups").find().toArray();
  return nameOfGroup;
};

/**
 * @summary add in the collection Groups a new group
 * @returns the name of the group we want to add
 * @param {*} dataBase
 * @param {*} req
 */
let addToGroupsCollection = async (dataBase, req) => {
  let groupsToAdd = req.body;
  try {
    await dataBase.collection("Groups").insertOne(groupsToAdd);
  } catch (error) {
    console.log(error);
  }
  return groupsToAdd;
};

/**
 * @summary search in the collection Groups, the group name we want to delete, then delete it
 * @returns the groupe name we want to delete
 * @param {*} dataBase
 * @param {*} req
 */
let deleteGroupsToCollection = async (dataBase, req) => {
  let groupName = req.params.name;
  const test = await dataBase
    .collection("Groups")
    .find({ name: groupName })
    .toArray();

  if (test.length > 0) {
    try {
      await dataBase.collection("Groups").deleteOne({ name: groupName });
    } catch (error) {
      console.log(error);
    }
    return groupName;
  } else {
    return "this Group doesn't exist";
  }
};
