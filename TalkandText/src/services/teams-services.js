import { get, set, ref, update, push, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createTeam = async (name, userUid) => {
  try {
    const result = await push(ref(db, 'teams'), {}); // Тук създаваме нов обект в колекцията 'teams' със празно съдържание и получаваме резултат от операцията.
    const uid = result.key;// Взимаме уникален идентификатор (uid) на новосъздадения елемент
    const owner = userUid;// Задаваме стойността на owner с текущия потребител (userUid).
    const channels = {}; // Инициализираме празен обект channels, който представлява канали за екипа.
    const members = {}; // Инициализираме празен обект members, който представлява членовете на екипа.
    members[userUid] = true; // Задаваме члена на екипа като ключ в обекта members със стойност true.

    await set(ref(db, `teams/${userUid}`), { name, owner, members, channels, uid }); // Създаваме нов обект в колекцията 'teams' 
    // със зададените свойства като name, owner, members, channels и uid.
    await update(ref(db), { [`users/${userUid}/MyTeams/${name}`]: uid }); // Обновяваме информацията за потребителя, като добавяме новия екип 
    // в списъка му с имена на екипите.

    return uid; // Връщаме уникалния идентификатор на новосъздадения екип.
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
  }
};

export const checkIfTeamNameExists = async (name) => {
  try {
    const teamsRef = ref(db, 'teams'); // Взимаме референция към колекцията 'teams'.
    const snapshot = await get(teamsRef); // Взимаме снимка на колекцията 

    if (snapshot.exists()) { // Проверяваме дали снимката съществува
      const teamsData = snapshot.val(); // Взимаме данните от снимката
      return Object.values(teamsData).some((team) => team.name === name); // Връщаме резултат от проверка дали има екип със същото име като подаденото.
    }

    return false; // Връщаме false, ако няма екипове в колекцията.
  } catch (error) { 
    console.error('Error checking if team name exists:', error.message);
    throw new Error('Error checking if team name exists');
  }
};

export const getTeamsByUserUid = async (userUid) => { // Функция, която връща екипите, в които са членове подадените потребители.
  try {
    const snapshot = await get(ref(db, 'teams')); // Взимаме снимка на колекцията 'teams'.

    if (snapshot.exists()) { // Проверяваме дали снимката съществува.
      const teamsData = Object.values(snapshot.val()); // Взимаме данните от снимката и ги преобразуваме в масив.
      // .filter((team) =>
      //   userUids.includes(team.uid)
      // );
      return teamsData; // Връщаме масива с екипите.
    }

    return []; // Връщаме празен масив, ако няма екипове в колекцията.
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const getAllTeams = async () => { // Функция, която връща всички екипи.
  try {
    const snapshot = await get(ref(db, 'teams')); // Взимаме снимка на колекцията 'teams'.

    if (!snapshot.exists()) { // Проверяваме дали снимката не съществува.
      return []; // Връщаме празен масив, ако няма екипове в колекцията.
    }
    const teamsArray = Object.values(snapshot.val()); // Взимаме данните от снимката и ги преобразуваме в масив.

    return teamsArray; // Връщаме масива с екипите.
  } catch (error) {
    console.error('Error fetching teams:', error); 
    throw error;
  }
};

export const getTeamsByUid = async (uuid) => { // Функция, която връща екипа по подаден уникален идентификатор.
  try {
    const snapshot = await get(ref(db, 'teams/' + uuid)); // Взимаме снимка на обекта с подадения уникален идентификатор.

    if (!snapshot.exists()) { // Проверяваме дали снимката не съществува.
      return []; // Връщаме празен масив, ако няма екипове в колекцията.
    }
    const team = snapshot.val(); // Взимаме данните от снимката.
    console.log(team);  // Извеждаме екипа в конзолата.
    return team;  // Връщаме екипа.
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const getTeamMembers = async (teamUid) => { // Функция, която връща членовете на екипа по подаден уникален идентификатор.
  try {
    const snapshot = await get(ref(db, `teams/${teamUid}/members/`)); // Взимаме снимка на обекта с подадения уникален идентификатор.
    if (!snapshot.exists()) { // Проверяваме дали снимката не съществува.
      return []; // Връщаме празен масив, ако няма членове в екипа.
    }
    const membersArray = Object.keys(snapshot.val()).filter( // Взимаме данните от снимката и ги преобразуваме в масив.
      (memberId) => snapshot.val()[memberId] === true // Филтрираме масива, като взимаме само членовете, които са true.
    );
    return membersArray; // Връщаме масива с членовете на екипа.
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};


export const addTeamMember = async (teamUid, userUid) => { // Функция, която добавя член към екип.
    try {
        await update(ref(db, `teams/${teamUid}/members`), { [userUid]: true }); // Обновяваме обекта с членовете на екипа, като добавяме новия член.
        await update(ref(db, `users/${userUid}/MyTeams`), { [teamUid]: true }); // Обновяваме обекта с екипите на потребителя, като добавяме новия екип.
    } catch (error) {
        console.error('Error adding member:', error);
        throw error;
    }
    };

    export const removeTeamMember = async (teamUid, userUid) => { // Функция, която премахва член от екип.
        try {
            await update(ref(db, `teams/${teamUid}/members`), { [userUid]: null }); // Обновяваме обекта с членовете на екипа, като премахваме члена.
            await update(ref(db, `users/${userUid}/MyTeams`), { [teamUid]: null }); // Обновяваме обекта с екипите на потребителя, като премахваме екипа.
        } catch (error) {
            console.error('Error removing member:', error);
            throw error;
        }
    }