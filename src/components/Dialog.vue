<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "./Select.vue";
import CalendarPicker from "./CalendarPicker.vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Edit Profile </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-4 py-4">
        <div class="flex flex-row justify-between">
            
            <div class="items-center gap-4">
            <CalendarPicker></CalendarPicker>
        </div>
        </div>
        
        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" default-value="Pedro Duarte" class="col-span-3" />
        </div>
        
        <div class="flex flex-row grid-cols-4 items-center gap-4">
          <Label for="room" class="text-right"> Room </Label>
          <Input id="username" default-value="@peduarte" class="col-span-3" />
        </div>
        
        <div class="grid w-full gap-2">
          <Label for="message">Notes</Label>
          <Textarea id="message" placeholder="Type your message here." />
        </div>
        
      </div>
      <DialogFooter>
        <Button type="submit"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
