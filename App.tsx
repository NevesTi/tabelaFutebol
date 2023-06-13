
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import TeamEntity from './src/entites/team_entity';
import { useEffect, useState } from 'react';


const table: TeamEntity[] = [
  {
    id: 1,
    position: 1,
    team_name: 'Manchester City',
    team_points: 10,
    team_shield_url: "https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png"
  },
  {
    id: 2,
    position: 20,
    team_name: 'Inter',
    team_points: 30,
    team_shield_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
  }
];

export default function App() {
  const [teams, setTeam] = useState<TeamEntity[]>();

  useEffect(() => {
    
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela Brasileirão série A</Text>
      <View style={styles.table}>
        <FlatList
          data={table}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(team) =>
            <View style={styles.item}>
              <Image style={styles.team_shield} source={{ uri: team.item.team_shield_url }} />
              <Text style={styles.team_position}>{team.item.position}</Text>
              <Text style={styles.team_name}>{team.item.team_name}</Text>
              <Text>{team.item.team_points}</Text>
            </View>
          }

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 16,
    marginHorizontal: 16
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 16
  },
  table: {
    flex: 1,
    backgroundColor: '#ccc',
    width: '100%',

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingTop: 16

  },
  team_shield: {
    width: 20,
    height: 20
  },
  team_name:{
    width: 150,
    textAlign: 'center'
  },
  team_position:{
    width: 20
  }
});