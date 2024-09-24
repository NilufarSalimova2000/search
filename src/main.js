const input = document.querySelector(".search_input");
const products = document.querySelector(".products_box");

const render = async (value) => {
    if(value.length > 2) {
        try {
            const res = await fetch(`https://data-lesson-13.vercel.app/all?title_like=${value}`);
            const data = await res.json();
            products.innerHTML = data.map((item)=> 
            `<li class="w-[250px] rounded-[4px] text-center shadow-md px-[20px] py-[20px] bg-[#fff]">
            <img src=${item.img}>
            <h3 class="font-bold mb-[10px]">${item.title}</h3>
            </li>`
            ).join("");
        } catch (error){
            return error.message;
        }
    }
}

const useDebounce = () => {
    let id;
    return () => {
      products.innerHTML = "<h2>Loading....</h2>";
      clearTimeout(id);
      id = setTimeout(() => {
        render(input.value);
      }, 500);
    };
  };
  
  const debounce = useDebounce();

input.addEventListener("keyup", (e) => {
    debounce();
});
  