// Tower Kit documentation https://tower.hardwario.com/
// SDK API description https://sdk.hardwario.com/
// Forum https://forum.hardwario.com/

#include <application.h>


#define TEMPERATURE_UPDATE_SERVICE_INTERVAL (10000)
#define TEMPERATURE_PUB_NO_CHANGE_INTERVAL (10000)
#define TEMPERATURE_PUB_VALUE_CHANGE 0.2f
#define TEMPERATURE_UPDATE_INTERVAL (5 * 1000)
#define TEMPERATURE_UPDATE_NORMAL_INTERVAL (10 * 1000)

#define BATTERY_UPDATE_INTERVAL (60 * 60 * 1000)

// LED instance
twr_led_t led;

// Button instance
twr_button_t button;

// Thermometer instance
twr_tmp112_t tmp112;
static event_param_t temperature_event_param = {.next_pub = 0};

uint16_t button_click_count = 0;
uint16_t button_hold_count = 0;

// Button event callback
void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    // Log button event
    twr_log_info("APP: Button event: %i", event);

    // Check event source
    if (event == TWR_BUTTON_EVENT_CLICK)
    {
        twr_log_debug("Button cliked!");

        // Toggle LED pin state
        twr_led_set_mode(&led, TWR_LED_MODE_TOGGLE);

         // Publish message on radio
        button_click_count++;
        twr_radio_pub_push_button(&button_click_count);
    }
    else if (event == TWR_BUTTON_EVENT_HOLD)    
    {   
        button_click_count++;
        twr_log_debug("Button hold!");
        twr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_HOLD_BUTTON, &button_hold_count);
    }
}

void battery_event_hander(twr_module_battery_event_t event, void *event_param)
{
      if (event == TWR_MODULE_BATTERY_EVENT_UPDATE)
    {
        float voltage;

        if (twr_module_battery_get_voltage(&voltage))
        {
        twr_log_info("APP: Battery voltage = %2.f", voltage);
        twr_radio_pub_battery(&voltage);
        }
    }
    else if (event == TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL)    
    {   
        twr_log_info("APP: Battery CRITICAL");
        twr_radio_pub_string("battery/-/state", "critical");
    }
}

void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    float celsius;
    event_param_t *param = (event_param_t *)event_param; 

    if (event == TWR_TMP112_EVENT_UPDATE)
    {
    if (twr_tmp112_get_temperature_celsius(self, &celsius))
        {
            if ((fabsf(celsius - param->celsius) >= TEMPERATURE_PUB_VALUE_CHANGE) || (param->next_pub < twr_scheduler_get_spin_tick()))
            {   
                twr_log_debug("APP: temperature is : %.2f °C", celsius);
                twr_radio_pub_temperature(param->channel, &celsius);

                param->celsius = celsius;  // Update the last known temperature
                param->next_pub = twr_scheduler_get_spin_tick() + TEMPERATURE_PUB_NO_CHANGE_INTERVAL;
            }
        }
    }
}

// Application initialization function which is called once after boot
void application_init(void)
{
    // Initialize logging
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    // Initialize LED
    twr_led_init(&led, TWR_GPIO_LED, false, 0);
    twr_led_pulse(&led, 2000);

    temperature_event_param.channel = TWR_RADIO_PUB_CHANNEL_R1_I2C0_ADDRESS_ALTERNATE;

    // Initialize button
    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    // Initialize thermometer on core module
    twr_tmp112_init(&tmp112, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&tmp112, tmp112_event_handler, NULL);
    twr_tmp112_set_update_interval(&tmp112, TEMPERATURE_UPDATE_SERVICE_INTERVAL);

    // Initialize radio
    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
    // Send radio pairing request
    twr_radio_pairing_request("sceleton", FW_VERSION);
    twr_radio_set_rx_timeout_for_sleeping_node(1000);
}

// Application task function (optional) which is called peridically if scheduled
void application_task(void)
{
    // static int counter = 0;

    // Log task run and increment counter
    twr_log_debug("APP: Task run ");

    // Plan next run of this task in 1000 ms
    twr_scheduler_plan_current_from_now(5000);
}
