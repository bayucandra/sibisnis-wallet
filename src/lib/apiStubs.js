export const getUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          id: '1',
          name: 'Arziky Yusya',
          email: 'arzikyyu@gmail.com',
          balance: '100.750.565',
          profilePicture: null
        }
      })
    }, 2000);
  })
}