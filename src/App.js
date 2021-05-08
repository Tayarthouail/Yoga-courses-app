import axios from "axios";
import React,{useState, useEffect} from "react";
import YogaCourses from "./components/YogaCourses/YogaCourses";
import Loading from "./components/IsLoading/Loading";
import LevelsFilter from './components/LevelsFilter/LevelsFilter';

//API to fetch the data
const url = 'https://gist.githubusercontent.com/Tayarthouail/8fb14fe117fdd718ceabd6ee05ed4525/raw/8c86c4bb89fc51667ba0578b2dcba14a0b21f08c/Yoga-courses-api.json';

function App() {
  
  //states
  const [yogaCourses, setYogaCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //getting all the level form Data
  const allLevels = [ ...new Set(yogaCourses.map((singleLevel)=> singleLevel.level))];
  const [levels, setLevels] = useState([]);

  


  //Function to fetch the data from the API
  const GetCourses = async () => {
    const response = await axios.get(url)
    const {data} = response;
    return data;
  }

//UseEffect to run the function on every render
  useEffect(()=> {
    const GetCoursesYoga = async () => {
      const result = await GetCourses();
      setYogaCourses(result);
      setTimeout(() => {setIsLoading(false)}, 1000);
      console.log(result);
    } 
    GetCoursesYoga();
  }, []);

  useEffect(()=> {
    setLevels(allLevels);
  },[])


  if(isLoading) {
    return (
      <Loading/>
    )
  } 
  else {
    return (
      <main>
        <LevelsFilter levels={levels}/>
        <YogaCourses yogaCourses= {yogaCourses}/>
      </main>
      );
  }

  
}

export default App;
