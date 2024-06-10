import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rtr.wanderpets",
  projectId: "662c766e0012e4ba0f5a",
  databaseId: "662c79d10027094c97bc",
  userCollectionId: "662c7a8700029f15db45",
  petlistCollectionId: "6630b1e9000a27c56062",
  adoptionRequestsCollectionId: "66518bb30032592af890",
  ratesCollectionId: "665c61f9002d26256c86",
  storageId: "662c7e69002c912ec4ec",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  petlistCollectionId,
  adoptionRequestsCollectionId,
  ratesCollectionId,
  storageId,
} = config;

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    // if (!newAccount || !newAccount.$id) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    // Perform individual searches for each attribute
    const locationResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("location", query)]
    );

    const ageResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("age", query)]
    );

    const breedResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("breed", query)]
    );

    const colorResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("color", query)]
    );

    const speciesResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("species", query)]
    );

    const genderResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("gender", query)]
    );

    const sizeResults = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("size", query)]
    );

    // Combine results and remove duplicates
    const combinedResults = [
      ...locationResults.documents,
      ...ageResults.documents,
      ...breedResults.documents,
      ...colorResults.documents,
      ...speciesResults.documents,
      ...genderResults.documents,
      ...sizeResults.documents,
    ];

    // Use a Map to remove duplicate documents based on the unique $id
    const uniqueResultsMap = new Map();
    combinedResults.forEach((doc) => {
      uniqueResultsMap.set(doc.$id, doc);
    });

    const uniqueResults = Array.from(uniqueResultsMap.values());

    if (uniqueResults.length === 0) throw new Error("No results found");

    return uniqueResults;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPetList = async (form) => {
  try {
    const imageUrl = await uploadFile(form.image, "image");

    const newPet = await database.createDocument(
      databaseId,
      petlistCollectionId,
      ID.unique(),
      {
        Name: form.Name,
        age: form.age,
        breed: form.breed,
        color: form.color,
        species: form.species,
        gender: form.gender,
        size: form.size,
        description: form.description,
        adoption_fee: form.adoption_fee,
        adoption_status: form.adoption_status,
        contact_num: form.contact_num,
        vaccination_status: form.vaccination_status,
        location: form.location,
        approval: form.approval,
        image: imageUrl,
        creator: form.userId,
        created_at: form.created_at,
      }
    );

    return newPet;
  } catch (error) {
    throw new Error(error);
  }
};

export const createAdoptionRequest = async (form) => {
  try {
    const petInfo = JSON.stringify({
      age: form.age || "",
      species: form.species || "",
      breed: form.breed || "",
      color: form.color || "",
      gender: form.gender || "",
      size: form.size || "",
      adoption_fee: form.adoption_fee || "",
      vaccination_status: form.vaccination_status || "",
      description: form.description || "",
      contact_num: form.contact_num || "",
      location: form.location || "",
      image: form.image || "",
    });

    const newAdoptionRequest = await database.createDocument(
      databaseId,
      adoptionRequestsCollectionId,
      ID.unique(),
      {
        requested_at: form.requested_at,
        adopter: form.userId,
        adopterName: form.adopterName,
        adopterContact: form.adopterContact,
        adopterAddress: form.adopterAddress,
        message: form.message,
        PetName: form.PetName,
        status: form.status,
        rated: form.rated,
        petInfo,
      }
    );

    return newAdoptionRequest;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAdoptionRequests = async (userId) => {
  try {
    const requests = await database.listDocuments(
      databaseId,
      adoptionRequestsCollectionId,
      [Query.equal("adopter", userId)]
    );

    return requests.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAdoptionRequested = async (petName) => {
  try {
    const requests = await database.listDocuments(
      databaseId,
      adoptionRequestsCollectionId,
      [Query.equal("PetName", petName)]
    );
    return requests.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAdoptionRequest = async (requestId) => {
  try {
    await database.deleteDocument(
      databaseId,
      adoptionRequestsCollectionId,
      requestId
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAdoptionRequest = async (requestId, data) => {
  if (!requestId) {
    throw new Error("Missing required parameter: 'requestId'");
  }

  try {
    const response = await database.updateDocument(
      databaseId,
      adoptionRequestsCollectionId,
      requestId,
      data
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePetAdoptionStatus = async (petName, data) => {
  try {
    // Find the pet by its name
    const pets = await database.listDocuments(databaseId, petlistCollectionId, [
      Query.equal("Name", petName),
    ]);

    if (pets.documents.length === 0) {
      throw new Error("Pet not found");
    }

    // Update the adoption status of the first pet with the specified name
    await database.updateDocument(
      databaseId,
      petlistCollectionId,
      pets.documents[0].$id,
      data
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const createRate = async ({
  petId,
  userId,
  username,
  petName,
  rating,
  feedback,
  timestamp,
}) => {
  try {
    const newRate = await database.createDocument(
      databaseId,
      ratesCollectionId,
      ID.unique(),
      {
        petId,
        userId,
        username,
        petName,
        rating: parseInt(rating),
        feedback,
        timestamp,
      }
    );

    // Update the adoption request to mark it as rated
    const adoptionRequests = await getAdoptionRequests(userId);
    // Find the adoption request by petName
    const adoptionRequestToUpdate = adoptionRequests.find(
      (request) => request.PetName === petName
    );
    if (adoptionRequestToUpdate) {
      await updateAdoptionRequest(adoptionRequestToUpdate.$id, {
        rated: "True",
      });
    } else {
    }
    return newRate;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPetIdByName = async (petName) => {
  try {
    // Query the database for pets with the given name
    const response = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.equal("Name", petName)]
    );

    // Check if any pets were found
    if (response.documents.length === 0) {
      throw new Error("Pet not found");
    }

    // Return the ID of the first pet found with the given name
    return response.documents[0].$id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePet = async (petId) => {
  try {
    await database.deleteDocument(databaseId, petlistCollectionId, petId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserRatings = async (userId) => {
  try {
    const ratings = await database.listDocuments(
      databaseId,
      ratesCollectionId,
      [Query.equal("userId", userId)]
    );

    return ratings.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllRatings = async () => {
  try {
    // Query the database to fetch all documents from the ratings collection
    const response = await database.listDocuments(
      databaseId,
      ratesCollectionId,
      [Query.limit(100)] // Limiting to 100 documents, adjust as needed
    );

    // Return the array of rating documents
    return response.documents;
  } catch (error) {
    throw new Error("Failed to fetch ratings: " + error.message);
  }
};
