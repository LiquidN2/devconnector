// const arr = [
//   {_id: '123', name: 'All'},
//   {_id: '123', name: 'All'},
//   {_id: '234', name: 'Ninja'},
//   {_id: '215', name: 'Op'},
//   {_id: '135', name: 'iopop'}
// ];

// const removeDuplicatesByProp = (arr, prop) => {
//   const result = arr.reduce((unique, o) => {
//     if(!unique.some(obj => obj[prop] === o[prop])) {
//       unique.push(o);
//     }
//     return unique;
//   },[]);

//   return result;
// };


const removeDuplicatesById = arr => {
  // create array of ids from prop _id of arr
  const ids = arr.map(el => el._id.toHexString());

  //
  const result = arr.filter((elment, index) => {
    return ids.indexOf(elment._id.toHexString()) === index;
  });

  return result;
};

const removeDuplicatesByProp = (arr, prop) => {
  // create array of props from array
  const arrOfProp = arr.map(el => el[prop]);

  //
  const result = arr.filter((elment, index) => {
    return arrOfProp.indexOf(elment[prop]) === index;
  });

  return result;
};

const removeDuplicatedChatUser = chatUsers => {
  const result = chatUsers.reduce((unique, o) => {

    const isDuplicate = unique.some(obj => {
      return obj.id === o.id && obj.room === o.room;
    });
    
    if (!isDuplicate) {
      unique.push(o);
    }

    return unique;
  }, []);

  return result;
}

// const removeDuplicatedChatUser = chatUsers => {
//   const ids = chatUsers.map(elid => elid.id.toString());
//   const rooms = chatUsers.map(elroom => elroom.room.toString());

//   const uniqueChatUsers = chatUsers.filter((chatUser, index) => {
//     return ids.indexOf(chatUser) === index && rooms.indexOf(chatUser) === index 
//   });

//   return uniqueChatUsers;
// }

module.exports = {
  removeDuplicatesByProp,
  removeDuplicatesById,
  removeDuplicatedChatUser
};