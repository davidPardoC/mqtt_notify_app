import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider';
import Toast from 'react-native-root-toast';
import { mainService } from '../services/main.service';
import { ConfigInterface } from '../interfaces/config.interface';

const commonSliderOptions = { minimumValue: -50, maximumValue: 100, step: 1 }

const ConfigurationScreen = () => {
  const [config, setConfig] = useState<ConfigInterface>({
    max_temp: 0,
    min_temp: 0,
    max_hum: 0,
    min_hum: 0,
    server_notification_enambled: false
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getInitialConfig()
  }, [])

  const getInitialConfig = async () => {
    const config = await mainService.getConfig()
    setConfig(config)
    setIsLoading(false)
  }

  const onSliderValueChange = (value: number[], key: string) => {
    switch (key) {
      case "max-temp-slider":
        setConfig({ ...config, max_temp: value[0] })
        break;
      case "min-temp-slider":
        setConfig({ ...config, min_temp: value[0] })
        break;
      case "max-hum-slider":
        setConfig({ ...config, max_hum: value[0] })
        break;
      case "min-hum-slider":
        setConfig({ ...config, min_hum: value[0] })
        break;
      default:
        break;
    }
  }

  const onNotificationChange = (value: boolean) => {
    setConfig({ ...config, server_notification_enambled: value })
  }

  const onSaveConfiguration = async () => {
    try {
      const { max_hum: maxHum, max_temp: maxTemp, min_hum: minHum, min_temp: minTemp, server_notification_enambled: serverNotificationEnabled } = config
      const newConfig = await mainService.updateConfiguration({ maxHum, maxTemp, minHum, minTemp, serverNotificationEnabled })
      setConfig(newConfig)
      Toast.show('Configuraciones Guardadas!')
    } catch (error) {

    }
  }

  return (
    <>
      <SafeAreaView >
        <View style={styles.container}>
          {isLoading && <ActivityIndicator />}
          <View style={styles.option_container_h}>
            <Text>Activar Notificaciones</Text>
            <Switch value={config.server_notification_enambled} onValueChange={onNotificationChange} disabled={isLoading} />
          </View>
          <View style={styles.option_container_v}>
            <Text>Temperatura Máxima: {config.max_temp} ºC</Text>
            <Slider value={config.max_temp} {...commonSliderOptions} onValueChange={(value) => onSliderValueChange(value as number[], "max-temp-slider")} disabled={isLoading} />
          </View>
          <View style={styles.option_container_v}>
            <Text>Temperatura Mínima: {config.min_temp} ºC</Text>
            <Slider value={config.min_temp} {...commonSliderOptions} onValueChange={(value) => onSliderValueChange(value as number[], "min-temp-slider")} disabled={isLoading} />
          </View>
          <View style={styles.option_container_v}>
            <Text>Humedad Máxima: {config.max_hum}%</Text>
            <Slider value={config.max_hum} {...commonSliderOptions} onValueChange={(value) => onSliderValueChange(value as number[], "max-hum-slider")} disabled={isLoading} />
          </View>
          <View style={styles.option_container_v}>
            <Text>Humedad Mínima: {config.min_hum}%</Text>
            <Slider value={config.min_hum} {...commonSliderOptions} onValueChange={(value) => onSliderValueChange(value as number[], "min-hum-slider")} disabled={isLoading} />
          </View>
          <View style={styles.option_container_v}>
            <Button title='Guardar' onPress={onSaveConfiguration} />
          </View>
        </View>
      </SafeAreaView>
    </>

  );
}


const styles = StyleSheet.create({
  container: {
    padding: '5%'
  },
  option_container_h: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  option_container_v: {
    display: 'flex',
    paddingTop: '5%',
    paddingBottom: '5%',
    borderTopColor: '#C6C5C5',
    borderTopWidth: 1,
  }
});

export default ConfigurationScreen