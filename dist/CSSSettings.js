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
		var styles = document.createElement('style')
		document.head.appendChild(styles)
		styles.innerHTML = `
			.cssettings {
				position:fixed;
				top:0; left:0;
				color:#FFF;
				background:rgba(0, 0, 0, 0.75);
				padding:0px 10px 10px;
				font-size:12px;
				font-weight:600;
				font-family:monospace;
				width:auto;
				display:inline-block;
			}

			.cssettings .cssettings-setting {
				display:table-row;
			}

			.cssettings .cssettings-setting .cssettings-setting-label,
			.cssettings .cssettings-setting .cssettings-setting-input,
			.cssettings .cssettings-setting .cssettings-setting-value{
				font-family:monospace;
				display:table-cell;
				white-space:nowrap;
				padding-top:5px;
				padding-right:5px;
			}

			.cssettings .cssettings-setting .cssettings-setting-input input,
			.cssettings .cssettings-setting .cssettings-setting-input select{
				box-sizing:border-box;
				border:none;
				border-radius:0px;
				width:100%;
				font-size:inherit;
			}

			.cssettings .cssettings-setting .cssettings-setting-input select{
				-webkit-appearance: none;
				border-radius: 0px;
				position:relative;
			}

			.cssettings .cssettings-setting[type='select']:after{
				content: ' ';
				border:10px solid transparent;
				border-top:10px solid #FFF;
				left:5px; top:5px;
				position:absolute;
			}
		`;

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
      if(this.target) this.target.style.setProperty(this.style, value)
   }

   this.construct(options)
}
