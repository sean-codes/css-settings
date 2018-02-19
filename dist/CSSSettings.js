function CSSettings(options) {
   this.construct = function(options) {
      this.container = document.createElement('div')
      this.container.classList.add('cssettings')
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
      container.classList.add('cssettings-setting')
      setting.html = {
         label: document.createElement('div'),
         inputWrapper: document.createElement('div'),
         input: document.createElement(setting.input.type == 'select' ? 'select' : 'input'),
         value: document.createElement('div')
      }
      setting.html.label.classList.add('cssettings-setting-label')
      setting.html.inputWrapper.classList.add('cssettings-setting-input')
      setting.html.value.classList.add('cssettings-setting-value')
      if(setting.input.type == 'select') {
         for(var option of setting.options) {
            setting.html.input.innerHTML += '<option>'+option+'</option'
         }
      }
      // Append
      for(var element in setting.html) container.appendChild(setting.html[element])
      setting.html.inputWrapper.appendChild(setting.html.input)
      this.container.appendChild(container)

      // Config
      setting.target = setting.target
      setting.suffix = setting.suffix || ''
      console.log(setting.input)
      for(property in setting.input) setting.html.input.setAttribute(property, setting.input[property])
      setting.html.value.innerHTML = setting.html.input.value + setting.suffix
      setting.html.label.innerHTML = setting.label
      // Listeners
      setting.html.input.addEventListener('change', this.change.bind(setting))
      setting.html.input.addEventListener('input', this.change.bind(setting))
      if(setting.create) setting.create()
      this.change.call(setting)
      return
   }

   this.change = function() {
      var value = this.html.input.value
      if(this.input.type == 'checkbox'){
         value = this.html.input.checked ? this.html.input.value : 'initial'
      }
      var value = this.value ? this.value() : value + this.suffix
      this.html.value.innerHTML = value
      if(this.target) this.target.style[this.style] = value
   }

   this.construct(options)
}
