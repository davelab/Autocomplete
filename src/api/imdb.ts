const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cdf34cd03bmshd0be833de50ebd4p1d7a79jsnd4a3a10f1ac2",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

const getImdbAutocomplete = async (value: string) => {
  try {
    const resp = await fetch(
      `https://imdb8.p.rapidapi.com/auto-complete?q=${value}`,
      options
    );
    const data = await resp.json();
    return data?.d?.map((item: any) => item.l) || [];
  } catch (error) {
    console.log(error);
  }
};

export default getImdbAutocomplete;
