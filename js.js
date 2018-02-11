function CSSettings(options) {
   this.construct = function(options) {
      this.container = document.createElement('div')
      this.container.classList.add('cssettings-container')
      document.body.appendChild(this.container)

      this.settings = []
      for(var setting of options.settings) {
         this.setup(setting)
         this.settings.push(setting)
      }
   }

   this.setup = function(setting) {
      // Create
      var container = document.createElement('div')
      container.classList.add('cssettings-setting-container')
      setting.html = {
         label: document.createElement('div'),
         input: document.createElement('input'),
         value: document.createElement('div')
      }
      setting.html.label.classList.add('cssettings-setting-label')
      setting.html.input.classList.add('cssettings-setting-input')
      setting.html.value.classList.add('cssettings-setting-value')

      // Append
      this.container.appendChild(container)
      for(var element in setting.html) container.appendChild(setting.html[element])

      // Config
      for(property in setting.input) setting.html.input[property] = setting.input[property]
      setting.html.value.innerHTML = setting.html.input.value + setting.suffix
      setting.html.label.innerHTML = setting.label

      // Listeners
      setting.html.input.addEventListener('change', this.change.bind(setting))

      return
   }

   this.change = function() {
      console.log(this)
      var value = this.html.input.value + this.suffix
      this.html.value.innerHTML = value
   }

   this.construct(options)
}
