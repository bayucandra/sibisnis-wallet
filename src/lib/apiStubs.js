// User API stubs

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
          profilePicture: null,
          emailVerification: true,
          phoneVerfication: true
        }
      })
    }, 5000);
  })
}

// History logins API stubs

export const getHistory = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
          { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
          { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
          { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
          { date: '30 Sep 2017 , 12:45', country: 'Indonesia', ip: '127.747.304.1', browser: 'Google Chrome' },
        ]
      })
    }, 5000);
  })
}

// News API Stubs

export const getNews = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          {
            title: "BRI Gangguan",
            date: "2 Agustus 2017 23:00:00",
            tags: "Tips and Trik",
            readStatus: false,
            articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15…"
          },
          {
            title: "BRI Gangguan",
            date: "2 Agustus 2017 23:00:00",
            tags: "Tips and Trik",
            readStatus: false,
            articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15…"
          },
          {
            title: "BRI Gangguan",
            date: "2 Agustus 2017 23:00:00",
            tags: "Tips and Trik",
            readStatus: true,
            articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
          },
          {
            title: "BRI Gangguan",
            date: "2 Agustus 2017 23:00:00",
            tags: "Tips and Trik",
            readStatus:  true,
            articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
          },
          {
            title: "BRI Gangguan",
            date: "2 Agustus 2017 23:00:00",
            tags: "Tips and Trik",
            readStatus: true,
            articleSummary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem …"
          }
        ]
      })
    }, 5000);
  })
}