import { useEffect, useState } from "react";

function Home() {

  const API_KEY = "0a117a7121b543caab951db34956f866";
  const [food, setFood] = useState([]);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=burger&apiKey=${API_KEY}`)
      .then(res => res.json())
      .then(data => setFood(data.results || []));
  }, []);

  return (
    <div className="container mt-4">

      <div className="row">

        {food.map((item) => (

          <div className="col-md-4 mb-3" key={item.id}>

            <div className="card">

              <img src={item.image} className="card-img-top" />

              <div className="card-body">

                <h5>{item.title}</h5>

                <button className="btn btn-success mt-2">
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;


