export const getTokenValue = (token: string | null) => {
  if (token) {
    let object = JSON.parse(token);
    return object.value;
  } else {
    throw new Error('Error with token');
  }
}

export const getTokenTime = (token: string | null) => {
  if (token) {
    let object = JSON.parse(token);
    return object.timestamp;
  } else {
    throw new Error('Error with token');
  }
}

export const checkTokenValid = (token: string | null) => {
  if (token) {
    const time = getTokenTime(token);
    return Date.now() < time ? true : false;
  } else {
    throw new Error('Error with token');
}
}
