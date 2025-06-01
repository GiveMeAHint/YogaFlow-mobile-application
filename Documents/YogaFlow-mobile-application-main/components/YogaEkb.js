import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

export default function MainCards() {
  const cardItems = [
    {
      key: '1',
      title: 'Занимаемся йогой вместе',
      subtitle: 'Группы в VK для занятия йогой в Екатеринбурге',
      image: require('./vkk.jpg'),
      links: [
        'https://vk.com/sunkalpa_ekb',
        'https://vk.com/sostoyaniesoznaniyglavnoe',
        'https://vk.com/grani.yoga',
      ],
      
      date: '25.05.25',
    },
    {
      key: '3',
      title: 'В Шарташском лесопарке появится первое pop-up пространство',
      subtitle: '«Наш Шарташ» предложит разнообразные мероприятия, в том числе и йогу',
      image: require('./83pop.jpg'),
      link: 'https://momenty.org/city/28277',
      date: '17.03.25',
    },
    {
      key: '2',
      title: 'Создаём Бали в Екатеринбурге',
      subtitle: 'Почему популярна горячая йога',
      image: require('./hot.jpg'),
      link: 'https://momenty.org/city/26828',
      date: '14.10.24',
    },
  ];

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn('Не удалось открыть ссылку: ' + url);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {cardItems.map((item, index) => (
        <View key={item.key}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              
              {item.links && (
                <View style={styles.linksContainer}>
                  {item.links.map((url, i) => (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.7}
                      onPress={() => openLink(url)}
                    >
                      <Text style={styles.linkText}>
                        {`${i + 1}. ${url.split('//')[1].split('/')[0]}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              
              {item.link && (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => openLink(item.link)}
                >
                  <Text style={styles.buttonText}>Подробнее</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          
          {index < cardItems.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,244,229,1)',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'A-HindVadodara-Bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: 'A-HindVadodara-Regular',
  },
  linksContainer: {
    marginBottom: 16,
  },
  linkText: {
    fontSize: 13,
    color: '#1E88E5',
    marginBottom: 6,
    textDecorationLine: 'underline',
    fontFamily: 'A-HindVadodara-Medium',
  },
  button: {
    backgroundColor: 'rgba(163, 174, 133, 1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'A-HindVadodara-SemiBold',
  },
  dateContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'A-HindVadodara-Regular',
  },
  divider: {
    height: 20,
  },
});