// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { chromium } = require('playwright')
const fs = require('fs')

export default class BingsController {
    'use strict'
    async extractCodeValue(inputText) {
        const pattern = /```(.*?)```/s
        let matches = inputText.match(new RegExp(pattern, 'g'))

        if (matches) {
            const lastMatch = matches[matches.length - 1]
            const lines = lastMatch.trim().split('\n')
            const lastLine = lines[lines.length - 1]
            const parts = lastLine.split('=')

            if (parts.length > 1) {
                let jsonString = parts[parts.length - 1].trim()
                jsonString = jsonString.replace('```', '')
                jsonString = jsonString.replace('\n', '')
                const stringList = JSON.parse(jsonString)
                return stringList
            }
        }
    }

    async get_data(phone_name) {
        let rawdata = fs.readFileSync('cookies.json')
        let cookies = JSON.parse(rawdata.toString())

        const browser = await chromium.launch()

        const context = await browser.newContext()
        const page = await context.newPage()
        let lastWebSocketMessage = null

        page.on('websocket', (ws) => {
            ws.on('framereceived', (event) => {
                lastWebSocketMessage = event.payload.toString()
            })
            ws.on(
                'close',
                () => console.log(this.extractCodeValue(lastWebSocketMessage)),
                browser.close()
            )
        })

        await context.addCookies(cookies)
        await page.goto(
            'https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx',
            {
                waitUntil: 'load',
            }
        )

        await page.waitForTimeout(5000)

        // Interact with the page
        // Note: The selectors might need to be updated based on the actual structure of the webpage.
        await page.evaluate(() => {
            let creative = document
                .querySelector('#b_sydConvCont > cib-serp')
                ?.shadowRoot?.querySelector('#cib-conversation-main')
                ?.shadowRoot?.querySelector(
                    '#cib-chat-main > cib-welcome-container'
                )
                ?.shadowRoot?.querySelector('div.controls > cib-tone-selector')
                ?.shadowRoot?.querySelector(
                    '#tone-options > li:nth-child(3) > button'
                ) as HTMLElement
            creative?.click()
        })

        await page.waitForTimeout(5000)

        await page.evaluate(() => {
            let searchBox: any | null = document
                .querySelector('#b_sydConvCont > cib-serp')
                ?.shadowRoot?.querySelector('#cib-action-bar-main')
                ?.shadowRoot?.querySelector(
                    'div > div.main-container > div > div.input-row > cib-text-input'
                )
                ?.shadowRoot?.querySelector('#searchbox')
            if (searchBox) {
                //text to send it to bing
                searchBox.value =
                    'give me list of models number without any additon for phone name : ' +
                    phone_name +
                    ' as the next format :- models_number = [models_number1,models_number2]'
                // Trigger an input event so that the page knows the value has changed
                searchBox.dispatchEvent(new Event('input', { bubbles: true }))
            }
        })

        await page.evaluate(() => {
            let send = document
                .querySelector('#b_sydConvCont > cib-serp')
                ?.shadowRoot?.querySelector('#cib-action-bar-main')
                ?.shadowRoot?.querySelector(
                    'div > div.main-container > div > div.bottom-controls > div.bottom-right-controls > div.control.submit > button'
                ) as HTMLElement
            send?.click()
        })
        await page.waitForTimeout(10000)

        await browser.close()
    }
}

module.exports = BingsController
