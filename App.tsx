import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type DiceImages = {
  [key: number]: any;
};

const App: React.FC = () => {
  
  const [player1Dice, setPlayer1Dice] = useState<number>(1);
  const [player2Dice, setPlayer2Dice] = useState<number>(1);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [roundWinner, setRoundWinner] = useState<string>('');
  const [totalWinner, setTotalWinner] = useState<string>(''); 
  const [ties, setTies] = useState<number>(0);


  const rollDice = (): void => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
  
    setPlayer1Dice(dice1);
    setPlayer2Dice(dice2);
  
    updateScores(dice1, dice2);
    updateTotalWinner();
  };
  
  const updateScores = (dice1: number, dice2: number): void => {
    if (dice1 > dice2) {
      setPlayer1Score((prev) => prev + 1); 
      setRoundWinner('Jogador 1');
    } else if (dice2 > dice1) {
      setPlayer2Score((prev) => prev + 1);
      setRoundWinner('Jogador 2');
    } else {
      setTies((prev) => prev + 1);
      setRoundWinner('Round Empatado');
    }
  };
  
  const updateTotalWinner = (): void => {
    if (player1Score > player2Score) {
      setTotalWinner('Jogador 1');
    } else if (player2Score > player1Score) {
      setTotalWinner('Jogador 2');
    } else {
      setTotalWinner('EMPATADO');
    }
  };
  

  const diceImages: DiceImages = {
    1: require('./assets/dice1.png'),
    2: require('./assets/dice2.png'),
    3: require('./assets/dice3.png'),
    4: require('./assets/dice4.png'),
    5: require('./assets/dice5.png'),
    6: require('./assets/dice6.png'),
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Jogo de Dados</Text>
      </View>

      {/* Vencedor acumulativo (h1) */}
      <Text style={styles.totalWinner}>VENCEDOR: {totalWinner}</Text>

      {/* Vencedor da rodada (h3) */}
      <Text style={styles.roundWinner}>Vencedor do Round: {roundWinner}</Text>

      {/* Área dos jogadores */}
      <View style={styles.playersContainer}>
        <View style={styles.player}>
          <Text style={styles.playerText}>Jogador 1</Text>
          <Image source={diceImages[player1Dice]} style={styles.diceImage} />
          <Text style={styles.scoreText}>Placar: {player1Score}</Text>
        </View>
        <View style={styles.player}>
          <Text style={styles.playerText}>Jogador 2</Text>
          <Image source={diceImages[player2Dice]} style={styles.diceImage} />
          <Text style={styles.scoreText}>Placar: {player2Score}</Text>
        </View>
      </View>

      {/* Botão de jogar */}
      <TouchableOpacity style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Jogar Dados</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Jogador 1: {player1Score}</Text>
        <Text style={styles.footerText}>Jogador 2: {player2Score}</Text>
        <Text style={styles.footerText}>Empates: {ties}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F9D58',
  },
  navbar: {
    backgroundColor: '#6200EE',
    padding: 15,
    alignItems: 'center',
  },
  navbarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalWinner: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  roundWinner: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  player: {
    alignItems: 'center',
  },
  playerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  diceImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#3700B3',
    padding: 15,
    marginHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#6200EE',
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default App;
