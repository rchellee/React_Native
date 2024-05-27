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
  videoCollectionId: "662c7c2b0030bad9eded",
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
  videoCollectionId,
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

//export async function signIn(email, password){}
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Account
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
    const posts = await database.listDocuments(
      databaseId,
      petlistCollectionId,
      [Query.search("Name", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
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
    const newAdoptionRequest = await database.createDocument(
      databaseId,
      adoptionRequestsCollectionId,
      ID.unique(),
      {
        requested_at: form.requested_at,
        adopter: form.userId,
        adopterName: form.adopterName, // Name of the user
        adopterContact: form.adopterContact, // Contact number of the user
        adopterAddress: form.adopterAddress, // Address of the user
        message: form.message,        // Any additional message from the user
        PetName: form.PetName,
        owner: form.owner,
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
