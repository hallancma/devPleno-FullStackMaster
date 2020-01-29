function tempo(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

tempo(2000).then(() => console.log('Foi'));
