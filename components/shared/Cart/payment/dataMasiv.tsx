export const getMonthName = (i: number) => {
  const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  return monthNames[i];
};

export const getDayName = (i: number) => {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  return days[i];
};

export const dataTime = () => {
  const masiv = [
    {
      data: 'пн',
      dataName: '',
      time: [
        { id: 0, dataName: '10:00 - 12:00' },
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
        { id: 5, dataName: '20:00 - 22:00' },
      ],
    },
    {
      data: 'вт',
      dataName: '',
      time: [
        { id: 0, dataName: '10:00 - 12:00' },
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
        { id: 5, dataName: '20:00 - 22:00' },
      ],
    },
    {
      data: 'ср',
      dataName: '',
      time: [
        { id: 0, dataName: '10:00 - 12:00' },
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
        { id: 5, dataName: '20:00 - 22:00' },
      ],
    },
    {
      data: 'чт',
      dataName: '',
      time: [
        { id: 0, dataName: '10:00 - 12:00' },
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
        { id: 5, dataName: '20:00 - 22:00' },
      ],
    },
    {
      data: 'пт',
      dataName: '',
      time: [
        { id: 0, dataName: '10:00 - 12:00' },
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
        { id: 5, dataName: '20:00 - 22:00' },
      ],
    },
    {
      data: 'сб',
      dataName: '',
      time: [
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
      ],
    },
    {
      data: 'вс',
      dataName: '',
      time: [
        { id: 1, dataName: '12:00 - 14:00' },
        { id: 2, dataName: '14:00 - 16:00' },
        { id: 3, dataName: '16:00 - 18:00' },
        { id: 4, dataName: '18:00 - 20:00' },
      ],
    },
  ];
  masiv.map((obj, i) => {
    const date = new Date();
    date.setDate(date.getDate() + 2 + i);

    obj.data = getDayName(date.getDay());
    obj.dataName = `${date.getDate()} ${getMonthName(date.getMonth())}`;
  });
  return masiv;
};
