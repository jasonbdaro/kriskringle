import React from 'react'
import {Label} from 'react-bootstrap'

export const rounds_grid_options = {
	schema: {
		model: {
			id: "id",
			fields: {
				id: { type: "string", editable: false },
				name: { type: "string" },
				season_id: { type: "string" },
				current: { type: "boolean" },
				created_at: { type: "string", editable: false }
			}
		}
	},
	columns: [
	{
		field: "name",
		title: "Name",
	},
	{
		field: "current",
		title: "Current",
		template: props => (
			<span>
				{
					props.current ? (
						<span>
							<Label bsStyle="success">Current</Label>&nbsp;
						</span>
					) : ( null )
				}
			</span>
		),
	},
	{
		field: "created_at",
		title: "Date"
	},
	{
		command: ['edit', 'destroy'],
		title: ''
	}],
	toolbar: ['create', 'save', 'cancel'],
	dataSource: {
		read: {
			url: 'rounds',
			complete: response => {
				console.log(response)
			}
		},
		create: {
			url: 'create-round',
			complete: response => {
				console.log(response)
			}
		},
		update: {
			url: 'update-round',
			complete: response => {
				console.log(response)
			}
		},
		destroy: {
			url: 'destroy-round',
			complete: response => {
				console.log(response)
			}
		},
	},
	pagination: {
		items: 5,
		maxButtons: 3
	},
}