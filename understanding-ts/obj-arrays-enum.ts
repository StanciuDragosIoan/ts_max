// const person : {
//     name: string,
//     age: number,
//     nickname: string
// }

//object ype
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; // special array with 2 elements (1st number 2nd string) this is a tuple
// } = {
//   name: "John",
//   age: 30,
//   hobbies: ["sports", "cooking"],
//   role: [1, "testRole"],
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "John",
  age: 30,
  hobbies: ["sports", "cooking"],
  role: Role.ADMIN,
};

let favouriteActivities: string[];
favouriteActivities = ["Sports"];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hoppy.map()); //throws err
}
