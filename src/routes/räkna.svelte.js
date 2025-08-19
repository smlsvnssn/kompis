import * as ö from 'ouml'

export class Person {
	constructor({ namn = '', inkomst = 0, utgift = 0 } = {}) {
		this.namn = namn
		this.inkomst = inkomst
		this.utgift = utgift
	}
	namn = $state()
	inkomst = $state()
	utgift = $state()
}

export const getTransactions = personer => {
	let totalInkomst = ö.pipe(ö.map(personer, 'inkomst'), ö.sum)
	let totalUtgift = ö.pipe(ö.map(personer, 'utgift'), ö.sum)

	let balansräkning = personer.map((person, i) => ({
		namn: person.namn ? person.namn : `Person ${i + 1}`,
		summa: (person.inkomst / totalInkomst) * totalUtgift - person.utgift
	}))

	const normaliseSum = p => ({ ...p, summa: ö.round(Math.abs(p.summa), 0) })

	let gäldenärer = balansräkning
		.filter(person => person.summa > 0)
		.sort((a, b) => b.summa - a.summa)
		.map(normaliseSum)

	let borgenärer = balansräkning
		.filter(person => person.summa < 0)
		.sort((a, b) => a.summa - b.summa)
		.map(normaliseSum)

	// impure
	const betalaTill = (gäldenär, borgenärer) => {
		gäldenär.skaBetalaTill = []

		for (let borgenär of borgenärer) {
			if (borgenär.summa > 0) {
				if (borgenär.summa <= gäldenär.summa) {
					gäldenär.skaBetalaTill.push({ ...borgenär })

					gäldenär.summa -= borgenär.summa
					borgenär.summa = 0
				} else {
					gäldenär.skaBetalaTill.push({
						...borgenär,
						summa: gäldenär.summa
					})

					borgenär.summa -= gäldenär.summa
					gäldenär.summa = 0
				}
			}
			if (gäldenär.summa == 0) break
		}

		return gäldenär
	}

	return gäldenärer.map(gäldenär => betalaTill(gäldenär, borgenärer))
}

export const formatTransactions = transaktioner => {
	const formatName = name => ö.pipe(name, ö.stripTags, ö.capitalise)

	const formatAmount = n =>
		ö.pipe(n, ö.prettyNumber, n => `<span class=amount>${n}</span>`)

	const formatPayees = borgenärer =>
		borgenärer.reduce(
			(out, borgenär, i, a) =>
				(out += `${formatAmount(borgenär.summa)} till ${formatName(borgenär.namn)}${ö.when(
					i < a.length - 1,
					' och '
				)}`),
			''
		)

	return transaktioner.reduce(
		(out, gäldenär, i, a) =>
			(out += `${formatName(gäldenär.namn)} ska betala ${formatPayees(gäldenär.skaBetalaTill)}${
				i < a.length - 2 ? ', '
				: i < a.length - 1 ? ', och '
				: '.'
			}`),
		''
	)
}
