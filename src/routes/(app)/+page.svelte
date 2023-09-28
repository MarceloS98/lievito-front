<script lang="ts">
	import { Card } from '$lib/components';
</script>

<div class="grid grid-cols-6 gap-5">
	<div class="col-span-2">
		<Card
			title="Ingreso de productos"
			description="Ingresa la produccion del mes"
			path="/productos/ingreso"
		/>
	</div>
	<div class="col-span-2">
		<Card
			title="Salida de productos"
			description="Ingresa la cantidad de productos vendidos"
			path="/productos/salida"
		/>
	</div>
	<div class="col-span-2">
		<Card
			title="Ingreso de insumos"
			description="Ingresa los insumos entrantes"
			path="/insumos/salida"
		/>
	</div>
	<div class="col-span-2">
		<Card
			title="Stock de productos"
			description="Controla el stock de tus productos"
			path="/stock-productos"
		/>
	</div>
	<div class="col-span-2">
		<Card
			title="Stock de insumos"
			description="Controla el stock de tus insumos"
			path="/stock-insumos"
		/>
	</div>
</div>
