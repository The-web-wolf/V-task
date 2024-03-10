### Installation and Usage

Before setting up the project, you need to get a [Pexels API key](https://www.pexels.com/api/). Once you have the key, you can create a `.env` file in the root of the project and add the following line:

```env
VITE_PEXELS_API_KEY=your_api_key
```
as in the .env.example file.

After that, you can install the project and run it.

This is a [Vite](https://vitejs.dev/) react typescript project. To install and run it, you need to have [Node.js](https://nodejs.org/) installed. Then, you can run the following commands:

```bash
npm install
npm run dev
```

This will start the development server and you can access the project at `http://localhost:5173`.

### Customization

In the `src` folder, you can find the `constants.ts` file. Here you can customize a few things: 

- `TOTAL_LIMIT`: The total number of images to be fetched from the Pexels API. I set it to 100 because I think it's a good number to test the infinite scroll feature. You can set it to a higher number if you want to fetch more images.
- `PER_PAGE`: The number of images to be fetched per page. Default is 9.
- `QUERY`: The default search query. Default is "art".

**All of these constants are required.**

### Testing

I've written some tests, to run them you can use the following command:

```bash
npm run test
```
