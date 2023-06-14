
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import TeamEntity from './src/entites/team_entity';
import { useEffect, useState } from 'react';
import React from 'react';


{/*const table: TeamEntity[] = [
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
];*/}

export default function App() {
  const [teams, setTeam] = useState<TeamEntity[]>([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer ");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let teamsPosition: TeamEntity[] = [];

    fetch("https://live_65cd9fc2c8c3ed2f7a7e84b1e71de5", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(dataJson => {
        dataJson.map((team) => {

          const dataTeam = {
            id: team['time']['time_id'],
            position: team['posicao'],
            team_shield_url: team['time']['escudo'],
            team_name: team['time']['nome_popular'],
            team_points: team['pontos']
          };

          teamsPosition.push(dataTeam);
        });
        setTeam(teamsPosition);
        console.log(teamsPosition);
      })
      .catch(error => console.log('error', error));
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela Brasileirão série A</Text>
      <View style={styles.table}>
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(team) =>
            <View style={styles.item}>
             {/* <Image style={styles.team_shield} source={team.item.team_shield_url} />*/}
              <Image style={styles.team_shield} source={{ uri: team.item.team_shield_url }} />
              <Text style={styles.team_position}>{team.item.position}</Text>
              <Text style={styles.team_name}>{team.item.team_name}</Text>
              <Text style={styles.team_position}>{team.item.team_points}</Text>
              {/* <Text>{team.item.team_points}</Text>*/}
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
    backgroundColor: '#33ff33',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 16,
    marginHorizontal: 16
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 30
  },
  table: {
    flex: 1,
    width: '100%'

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    height: 50

  },
  team_shield: {
    width: 30,
    height: 30
  },
  team_name: {
    fontSize: 20,
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold'

  },
  team_position: {
    width: 30,
    fontSize: 20
  }
});