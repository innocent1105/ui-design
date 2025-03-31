'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import RequiredAsterisk from '@/components/required-asterisk';

const BasicForm: React.FC = () => {
	const [ form, setForm ] = useState({
		email: '',
		password: '',
		callJohn: false
	});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, type, value } = event.target;
		const checked = (event.target as HTMLInputElement).checked;
		setForm((prevForm) => ({
			...prevForm,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email" className="text-sm font-medium">
					Email Address <RequiredAsterisk />
				</Label>
				<Input
					id="email"
					name="email"
					placeholder="Enter Email"
					value={form.email}
					onChange={handleChange}
					required
					autoComplete="off"
				/>
				<p className="text-xs text-muted-foreground">We'll never share your email with anyone else.</p>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password" className="text-sm font-medium">
					Password <RequiredAsterisk />
				</Label>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="Enter Password"
					value={form.password}
					onChange={handleChange}
					required
					autoComplete="new-password"
				/>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox
					id="callJohn"
					name="callJohn"
					checked={form.callJohn}
					onCheckedChange={(checked) =>
						handleChange({ target: { name: 'callJohn', type: 'checkbox', checked } } as React.ChangeEvent<
							HTMLInputElement
						>)}
				/>
				<Label htmlFor="callJohn" className="text-sm font-medium">
					Call John for dinner
				</Label>
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default BasicForm;
