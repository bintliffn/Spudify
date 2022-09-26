import { View, SafeAreaView, Image } from "react-native";


function Dashboard({navigation}){
    const [username, setUsername] = React.useState();

    async function fetchData() {
        const test = await getRecentlyPlayed();
        setJsonBody(test[0].track);
        setDisplay(true);
      }
    
      React.useEffect(() => {
        fetchData();
      }, []);


    return(
        <SafeAreaView>

        </SafeAreaView>
    );

}