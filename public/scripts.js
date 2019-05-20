/*
 * Modifications copyright (c) 2019 Andrew Steel <copyright@andrewsteel.net>
*/

class CandidatesTable
{
	constructor (candidates)
	{
		this.element = (() => {
			const table = document.createElement("table");
			table.setAttribute("class", "candidates-table");

			const table_head = table.createTHead().insertRow();
			const table_head_col1 = table_head.appendChild(
				document.createElement("th")
			);
			table_head_col1.innerHTML = "Name";
			const table_head_col2 = table_head.appendChild(
				document.createElement("th")
			);
			table_head_col2.innerHTML = "Skills";

			table.appendChild(document.createElement("tbody"));

			return table;
		})();
		this.fill(candidates);
	}

	add (name, skills)
	{
		const row = this.element.getElementsByTagName("tbody")[0]
			.insertRow();
		row.insertCell()
			.appendChild(document.createTextNode(name));
		row.insertCell()
			.appendChild(document.createTextNode(skills.join(", ")));
	}

	clear ()
	{
		const rows = this.element.getElementsByTagName("tr");
		while (rows.length > 1) {
			this.element.deleteRow(1);
		}
	}

	fill (candidates)
	{
		this.clear();
		candidates.forEach((candidate) => {
			this.add(candidate.name, candidate.skills);
		});
	}
}

function filterCandidatesBySkill (candidates, skillFilter)
{
	return candidates.filter((candidate) => (
		candidate.skills.find((skill) => (
			skill.match(new RegExp(`.*${skillFilter}.*`, "i"))
		))
	));
}

function mountBody ()
{
	const candidates = [
		{ name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
		{ name: "Mario", skills: ["Python", "AWS"] },
		{ name: "Jacquline", skills: ["JavaScript", "Azure"] },
		{ name: "Kathy", skills: ["JavaScript", "Java"] },
		{ name: "Anna", skills: ["JavaScript", "AWS"] },
		{ name: "Matt", skills: ["PHP", "AWS"] },
		{ name: "Matt", skills: ["PHP", ".Net", "Docker"] },
	];

	const candidatesTable = new CandidatesTable(candidates);

	const filterInput = document.getElementsByClassName("candidates-filter")[0]
		.getElementsByTagName("input")[0];
	filterInput.oninput = (event) => {
		candidatesTable.fill(
			filterCandidatesBySkill(candidates, event.target.value)
		);
	};

	document.body.appendChild(candidatesTable.element);
}

(document.readyState === "loading")
	? document.addEventListener("DOMContentLoaded", mountBody)
	: mountBody();
